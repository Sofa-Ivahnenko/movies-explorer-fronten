import React from "react";
// import { Link } from "react-router-dom";
import "./AboutMe.css";
import my_photo from "../../images/my_avatar.PNG";

function AboutMe() {


  return (
    <section className="aboutMe" id="aboutMe-id">
      <div className="aboutMe__container">
        <h3 className="aboutMe__title">Студент</h3>

        <div className="aboutMe__flex-profile">
          
          <div className="aboutMe__profile-link">
            <div className="aboutMe__flex-text-profile">
                <h2 className="aboutMe__main-title">Виталий</h2>
                <h3 className="aboutMe__sub-title">Фронтенд-разработчик, 30 лет</h3>
                <p className="aboutMe__about-text">
                Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, 
                а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл 
                курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                </p>  
            </div>
            <a href="https://github.com/Sofa-Ivahnenko" className="aboutMe__link-github" target="blank">
              Github
            </a> 
          </div>
          
          <img className="aboutMe__flex-avatar" src={my_photo} alt="мое фото" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;


