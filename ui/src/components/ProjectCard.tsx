import Link from 'next/link';

interface ProjectCardProps {
  hackathonId: string;
  project: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ hackathonId, project }) => {
  return (
    <Link href={`/hackathons/${hackathonId}/projects/${project.id}`} passHref>
      <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden cursor-pointer">
        <img
          src={`https://picsum.photos/seed/${project.id}/400/400`}
          alt={project.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold">{project.title}</h2>
          <p className="text-gray-700">{project.description}</p>
          <div className="mt-2">
            {project.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;