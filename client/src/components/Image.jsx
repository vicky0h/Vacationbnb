export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? "uploads/" + src
      : "http://localhost:4000/" + src;
  return <img {...rest} src={src} alt={""} />;
}
