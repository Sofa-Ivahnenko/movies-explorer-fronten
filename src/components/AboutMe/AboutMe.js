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
						Я родилась и живу в городе Белгород. На данный момент являюсь студенткой ИИиЦТ направление "Бизнес-информатик".
						Сейчас начинаю свой путь в ИТ. В свободное время люблю гулять и смотреть фильмы. Много времени уделяю спорту (вейк-борд, танцы, аэростейчинг).
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
