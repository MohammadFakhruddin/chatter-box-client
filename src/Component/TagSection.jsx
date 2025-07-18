// src/Component/TagSection.jsx
const TagSection = ({ onSelectTag }) => {
  const tags = [
    "javascript",
    "react",
    "mongodb",
    "express",
    "nodejs",
    "jwt",
    "vercel",
    "useEffect",
    "closures",
    "fullstack",
    "vscode",
    "authentication",
    "async",
    "vue",
    "angular"
  ];

  return (
    <section className="py-6 px-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🔥 Browse by Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <button
            key={i}
            onClick={() => onSelectTag(tag)}
            className="badge badge-outline badge-info cursor-pointer hover:badge-primary transition-all"
          >
            #{tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TagSection;
