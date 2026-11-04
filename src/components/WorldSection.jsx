import AnimatedContent from './motion/AnimatedContent'
import TextType from './motion/TextType'
import ImageSlot from './ImageSlot'

export default function WorldSection({ index, world, statements, description, items, imageLabel, imagePath = '', tone = 'engineering' }) {
  return <section id={tone} className={`world-section world-section--${tone}`} aria-labelledby={`${tone}-heading`}><AnimatedContent className="world-label"><span>{index}</span><p>{world} WORLD</p></AnimatedContent><div className="world-copy"><h2 id={`${tone}-heading`}>{world}</h2><TextType as="p" text={statements} typingSpeed={42} pauseDuration={1700} deletingSpeed={24} typeEffect="fade" className="world-rotator" cursorStyle="bar" cursorColor={tone === 'business' ? '#d7d4ce' : '#6ea8fe'} startOnVisible /><p className="world-description">{description}</p><div className="world-items">{items.map((item, i) => <AnimatedContent key={item.title} delay={i * .08} y={16} className="world-item"><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.description}</p><small>{item.meta}</small></div></AnimatedContent>)}</div></div><AnimatedContent className="world-media" y={28} scale={.98}><ImageSlot src={imagePath} label={imageLabel} /></AnimatedContent></section>
}
