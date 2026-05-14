export default function Skills() {
  const skillCategories = [
    {
      title: "Robotics & Control",
      skills: ["ROS 2", "Gazebo Simulation", "6-DoF Control", "ArduSub", "Micro-ROS"]
    },
    {
      title: "AI & Computer Vision",
      skills: ["YOLO (v5, v8, v11)", "OpenCV", "OpenVINO", "TensorFlow", "Image Processing"]
    },
    {
      title: "Software Engineering",
      skills: ["C++ (STL)", "Python", "PostgreSQL", "Linux (Ubuntu)", "Git & Zsh"]
    }
  ];

  return (
    <section id="skills" className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-slate-100">
        <span className="text-blue-500 font-mono text-xl">02.</span> 
        Technical Expertise
        <div className="h-[1px] bg-slate-800 flex-grow"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((cat, i) => (
          <div key={i} className="p-6 rounded-xl border border-slate-800 bg-slate-900/30">
            <h3 className="text-blue-400 font-mono mb-4 font-bold">{cat.title}</h3>
            <ul className="space-y-2">
              {cat.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-slate-400">
                  <span className="text-blue-500 text-xs">▹</span> {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}