const features = [
  {
    title: "One-Click Complaints",
    desc: "Easily raise and track complaints to city departments.",
  },
  {
    title: "Real-Time Status",
    desc: "Monitor resolutions and department responses live.",
  },
  {
    title: "Role-Based Access",
    desc: "Citizens, officials, and admins each have dedicated dashboards.",
  },
];

export default function FeaturesOverview() {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-10">Why CitiNexus?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {features.map((f, idx) => (
          <div key={idx} className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-700">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
