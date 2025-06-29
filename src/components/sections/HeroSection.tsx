export default function HeroSection() {
  return (
    <section className="bg-blue-50 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Empowering Smart City Governance</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
        Bridging citizens and departments through transparency, speed, and technology.
      </p>
      <div className="mt-6">
        <a href="/login" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition">
          Get Started
        </a>
      </div>
    </section>
  );
}
