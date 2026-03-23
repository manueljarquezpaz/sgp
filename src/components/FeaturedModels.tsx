const models = [
  { name: "UNIQLO", team: "Team UNIQLO", img: "/images/image_1.jpg" },
  { name: "ZARA", team: "Team ZARA", img: "/images/image_2.jpg" },
  { name: "Ginlee Studio", team: "Team Ginlee", img: "/images/image_3.jpg" },
  { name: "Sabrina", team: "Team Sabrina", img: "/images/image_4.jpg" },
];

export default function FeaturedModels() {
  return (
    <section className="py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {models.map((model, idx) => (
          <div key={idx} className="relative group overflow-hidden h-[500px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${model.img})` }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-2xl font-serif">{model.name}</h3>
              <p className="text-xs uppercase tracking-widest mt-2">
                {model.team}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
