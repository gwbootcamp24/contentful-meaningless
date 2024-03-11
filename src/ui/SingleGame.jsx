export default function SingleGame({game}) {
  console.log(game)
  const {id, first_release_date} = game.fields.game
  console.log(id)
  console.log("first_release_date",first_release_date)

  const myDate = new Date(first_release_date * 1000);
  console.log(myDate.toISOString().substring(0,10))

  return (
<>
          <p>{id}</p>
          <p>{game.fields.game.name}</p>
          <img src={game.fields.game.cover} />
          <p>Release: {myDate.toISOString()}</p>
          <ul>{game.fields.game.genres?.map((g) => <li>{g}</li>)}</ul>


       
      </>
  );
}
