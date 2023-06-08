import Image from "next/legacy/image";

interface IProps {
  src: string;
  width: number;
  height: number;
}
const Avatar = ({ src, width, height }: IProps) => {
  return (
    <div>
      <Image
        width={width ?? 30}
        height={height ?? 30}
        src={src ?? ""}
        alt="avatar"
        className="cursor-pointer rounded-full"
      />
    </div>
  );
};

export default Avatar;
