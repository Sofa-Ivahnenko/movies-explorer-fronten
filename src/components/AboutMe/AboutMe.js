import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

const AboutMe = () => {
	return (
		<section className="about-me">
			<h2 className="about-me__header">Студент</h2>

			<div className="about-me__container">
				<div className="about-me__info">
					<h3 className="about-me__name">Софа</h3>
					<p className="about-me__job">Фронтенд-разработчик, 20 лет</p>
					<p className="about-me__description">
						Я родилась и живу в городе Белгород. Являюсь студенткой направления "Бизнес-информатик" института ИиЦТ.
						Увлекаюсь танцами, вейкбордом. Люблю активный отдых. Сейчас начинаю свой путь в ИТ.
					</p>

					<ul className="about-me__links">
						<li><a className="about-me__link" href="https://github.com/Sofa-Ivahnenko/" target="_blank" rel="noreferrer">Github</a></li>
					</ul>
				</div>

				<img src={avatar} alt="Обо мне" className="about-me__image" />
			</div>
		</section>
	);
};

export default AboutMe;
