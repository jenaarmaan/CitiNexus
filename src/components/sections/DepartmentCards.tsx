const departments = [
  "Sanitation",
  "Water Supply",
  "Electricity",
  "Traffic Management",
  "Waste Management",
  "Urban Planning"
];

export default function DepartmentCards() {
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-center text-2xl font-bold text-blue-800 mb-6">Key Departments</h2>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {departments.map((dept, idx) => (
          <div key={idx} className="bg-white border border-gray-200 shadow-sm px-6 py-4 rounded-md w-64 text-center hover:shadow-md">
            <h3 className="text-lg font-medium text-gray-800">{dept}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
