export default function arrayOf(
  numberOfElements: number,
  startFrom: number = 0,
) {
  return Array.from({ length: numberOfElements }, (_, i) => i + startFrom);
}
