import { Link } from "react-router";

const AllPosts = ({ posts, page, setPage, totalPages }) => {
  const calculateVoteDiff = (post) => post.upVote - post.downVote;

  return (
    <div className="my-8 px-4 lg:px-0 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📚 All Posts</h2>

      <div className="grid gap-6">
        {posts?.map((post, index) => (
          <div key={index} className="bg-base-100 shadow-md rounded-xl p-5 flex flex-col md:flex-row gap-4">
            <img src={post.image} alt={post.title} className="w-full md:w-52 rounded-xl object-cover" />
            <div className="flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <img src={post.author.photo} className="w-8 h-8 rounded-full" alt="author" />
                  <span className="font-medium">{post.author.name}</span>
                  <span className="text-sm text-gray-400">· {new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral">{post.title}</h3>
                <div className="flex gap-2 flex-wrap mt-2">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="badge badge-outline badge-secondary text-xs">#{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>💬 {post.commentCount} comments</span>
                <span>⬆️ {post.upVote} | ⬇️ {post.downVote} = 🔥 {calculateVoteDiff(post)}</span>
              </div>

              {/* 🔗 See Full Post Link */}
              <div className="mt-4">
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-sm btn-link text-primary font-semibold"
                >
                  🔍 See Full Post
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn btn-xs ${page === i + 1 ? "btn-primary text-white" : "btn-outline"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
