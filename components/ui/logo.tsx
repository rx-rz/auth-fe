export const Logo = ({
  width,
  height,
  withoutTitle,
}: {
  width?: string;
  height?: string;
  withoutTitle?: string;
}) => {
  return (
    <div className="flex gap-1 w-fit h-fit items-center font-bold">
      <img src="/rollo.svg" height={height ?? 50} width={width ?? 50} alt="" />
      <p>{withoutTitle ? "rollo" : ""}</p>
    </div>
  );
};
