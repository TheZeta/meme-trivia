import '../styles/Home.css';

export const Home = () => {
  return (
    <>
      <div className='home-container'>
        <main className='main'>
          <h1>Welcome to Meme Game!</h1>
          <p>Test your meme knowledge and have fun!</p>
          <section>
            <h2>How to Play</h2>
            <p>1. You will be shown a random meme picture.</p>
            <p>2. Choose the caption that best matches the meme from the given options.</p>
            <p>3. Earn points for correct matches and see your score at the end!</p>
          </section>
        </main>
      </div>
    </>
  );
};
