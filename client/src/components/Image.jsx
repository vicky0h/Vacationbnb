export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? "uploads/" + src
      // : "http://localhost:4000/" + src;
      : "https://github.com/vicky0h/Vacationbnb/tree/main/api/" + src;
  return <img {...rest} src={src} alt={""} />;
}
