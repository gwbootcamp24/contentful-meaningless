import { Link, useParams } from 'react-router-dom';


export default function SingleGame({game}) {
  const {id, first_release_date} = game.fields.game

  const myDate = new Date(first_release_date * 1000);

  return (
<>
          

    <div className="col-md-4 col-sm-6 col-xs-12">
			<div className="card">
				<div className="cover item-a" style={{backgroundImage: `url(${game.fields.game.cover.replace('thumb', 'cover_big')})`}}>
					<h1>{game.fields.game.name}</h1>
					<span className="price">★{Math.round(Number(game.fields.game.total_rating))}</span>
					<div className="card-back">
          <Link key={game.sys.id} to={`/games/${game.sys.id}`}>

          <p>Release: {myDate.toISOString().substring(0,10)}</p>
          <br/>
          Genres:
          <ul>{game.fields.game.genres?.map((g) => <li key={g}>{g}</li>)}</ul>
          <br/>
						<a href="#">View detail</a>

            </Link>

					</div>
				</div>
			</div>
		</div>
       
      </>
  );
}
