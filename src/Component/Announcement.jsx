const Announcement = ({ announcements }) => {
  if (!announcements.length) return null;

  return (
    <section className="py-6 px-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📢 Announcements</h2>
      <div className="space-y-4">
        {announcements.map((a, i) => (
          <div key={i} className="bg-info bg-opacity-10 p-4 rounded-lg border border-info">
            <div className="flex items-center gap-3 mb-2">
              <img src={a.authorImage} alt={a.authorName} className="w-8 h-8 rounded-full" />
              <span className="font-semibold">{a.authorName}</span>
              <span className="text-sm text-gray-500">· {new Date(a.createdAt).toLocaleDateString()}</span>
            </div>
            <h3 className="text-lg font-bold">{a.title}</h3>
            <p className="text-sm text-gray-700">{a.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Announcement;
