pipeline {
    agent any
    
    tools {
        // Assurez-vous que Docker est installé sur vos nœuds Jenkins
        // ou utilisez un nœud avec Docker préinstallé
        // Vous pouvez aussi ajouter 'docker' ici si vous avez configuré Docker dans les outils globaux de Jenkins
    }
    
    environment {
        // Ces variables devront être configurées dans Jenkins
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        AWS_CREDENTIALS = credentials('aws-credentials')
        DOCKER_IMAGE = 'deploy/yamify'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        // Variables d'environnement pour la base de données et autres services
        DATABASE_URL = credentials('database-url')
        DIRECT_URL = credentials('direct-url')
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = credentials('clerk-publishable-key')
        CLERK_SECRET_KEY = credentials('clerk-secret-key')
        SIGNING_SECRET = credentials('signing-secret')
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Récupérer le code source depuis GitHub
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Construire l'image Docker
                    sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                    
                    // Exécuter les tests
                    sh 'docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} npm test'
                    
                    // Nettoyer après les tests
                    sh 'docker system prune -f'
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Se connecter à Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', 
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USER} --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                        // Tagger également comme 'latest' pour la dernière version stable
                        sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }
        
        stage('Deploy to AWS') {
            steps {
                script {
                    // Déployer sur AWS ECS ou EC2
                    // Cette étape dépend de votre configuration AWS
                    // Voici un exemple pour déployer sur un serveur EC2 via SSH
                    withCredentials([sshUserPrivateKey(credentialsId: 'aws-ssh-credentials', 
                                                   keyFileVariable: 'SSH_KEY',
                                                   usernameVariable: 'SSH_USER')]) {
                        sh """
                            chmod 600 ${SSH_KEY}
                            ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${SSH_USER}@votre-instance-aws '
                                docker-compose pull && 
                                docker-compose down && 
                                docker-compose up -d
                            '
                        """
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline exécuté avec succès!'
        }
        failure {
            echo 'Le pipeline a échoué. Veuillez vérifier les logs pour plus de détails.'
        }
    }
}
