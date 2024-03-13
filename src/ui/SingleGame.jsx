export default function SingleGame({game}) {
  const {id, first_release_date} = game.fields.game

  const myDate = new Date(first_release_date * 1000);

  return (
<>
          <p>{id}</p>
          <p>{game.fields.game.name}</p>
          <img src={game.fields.game.cover.replace('thumb', 'cover_big')} />
          <p>Release: {myDate.toISOString()}</p>
          <ul>{game.fields.game.genres?.map((g) => <li key={g}>{g}</li>)}</ul>


       
      </>
  );
}
