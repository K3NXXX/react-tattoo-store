import style from "./About.module.scss";
import img1 from "../../assets/img/About/1.png";
const About: React.FC = () => {
  return (
    <section className={style.wrapper}>
      <div className={style.left}>
        <img src={img1} alt="2 people with tattoos" />
      </div>
      <div className={style.right}>
        <h2 className={style.title}>Тату магазин Mr. Driskell</h2>
        <p className={style.text}>
          Вітаємо вас у Tattoo Mall – у нашому тату магазині збираються
          ентузіасти індустрії, професійні майстри та новачки, які тільки
          роблять перші кроки у тату мистецтві. Ми знаємо, наскільки важливо
          грамотно та точно підібрати інструменти для продуктивних тату сеансів,
          та допомагаємо швидко знайти те, що допоможе їх зробити саме такими. 
        </p>
        <p className={style.text}>У
          нашому асортименті не просто обладнання тату, це буквально ціла
          команда з грамотних і дійсно ефективних помічників на вашому робочому
          столі. Пройшовши етап довгих розробок та незліченних тестів під
          пильним поглядом вітчизняних машинобудівників, космецевтів та брендів
          зі світовим ім'ям, ці товари напрацьовували досвід і щодня ставали
          кращими, щоб показати, на що вони здатні, та допомогти розкрити ваш
          потенціал.</p>
      </div>
    </section>
  );
};

export default About;
