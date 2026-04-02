export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__media">
          <img
            src="/hero_image.png"
            alt="Michel Chiha's Constitutional Papers"
            className="hero__image"
          />
        </div>
        <blockquote className="hero__quote">
          Plus tard, quand nous serons partis pour le royaume des ombres,
          si nous avons bien rempli notre tâche, si quelque chose doit demeurer
          de tant de pages quotidiennes, quelque «écolier» attentif, quelque
          historien aux veilles studieuses le découvrira.
        </blockquote>
      </div>
    </section>
  );
}