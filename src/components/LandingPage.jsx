export default function LandingPage({ username, onFinish }) {
  return (
    <div className="card">
      <h2>เรียบร้อยแล้ว!</h2>
      <p>ตั๋วของคุณ{username} จะถูกส่งไปยังเมล์ที่กรอกไว้</p>
      <button onClick={onFinish}>Finish</button>
    </div>
  );
}
