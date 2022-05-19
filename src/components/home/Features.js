import featuresData from "../../data/featuresData";

export default function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featuresData.map((feature, index) => (
        <div className="feature-item" key={index}>
         <img src={feature.img} alt={feature.alt} className="feature-icon" />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>{feature.text}</p>
        </div>
      ))}
    </section>
  );
}