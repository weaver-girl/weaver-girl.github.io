import { faqs } from "../data/content";
import { Reveal } from "./Reveal";

/** Native <details>, so it stays keyboard accessible and works without state. */
export function Faq() {
  return (
    <div className="faq-list">
      {faqs.map((item, index) => (
        <Reveal key={item.q} as="details" className="faq-item" delay={index * 45}>
          <summary>
            <span className="faq-q">{item.q}</span>
            <span className="faq-icon" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{item.a}</p>
        </Reveal>
      ))}
    </div>
  );
}
