
export default function HeroBg(){
  return (
    <>
      {/* Background grid */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      {/* Light mode: soft warm pool top-left */}
      <div className="dark:hidden absolute pointer-events-none" style={{
        top: '-10%', left: '-8%', width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,134,11,0.04) 0%, transparent 70%)',
      }} />
      {/* Light mode: bottom right accent */}
      <div className="dark:hidden absolute pointer-events-none" style={{
        bottom: '-5%', right: '0%', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,134,11,0.03) 0%, transparent 70%)',
      }} />

      {/* Dark mode: gold pool */}
      <div className="hidden dark:block absolute pointer-events-none" style={{
        top: '-10%', left: '-8%', width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
      }} />
    </>
  );
}