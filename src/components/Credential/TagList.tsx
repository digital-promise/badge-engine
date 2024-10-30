export default function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex gap-2">
      {tags
        .filter((t) => t)
        .map((t, i) => (
          <li
            key={i}
            className="rounded-[0.25rem] bg-gray-1 px-4 py-2 font-medium text-neutral-5"
          >
            {t}
          </li>
        ))}
    </ul>
  );
}
