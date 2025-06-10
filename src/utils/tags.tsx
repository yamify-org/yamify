import TagIcon from "@/components/TagIcon";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const createTag = () => ({
  icon: ({ width = 15, height = 15, color }: IconProps = {}) => (
    <TagIcon width={width} height={height} color={color} />
  ),
});

export const tag = createTag();
