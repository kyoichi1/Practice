export default function About(){
  return (
    <div>
      <h1>About this </h1>
      <ul>
        <li>Aang</li>
      </ul>
      </div>
  )
}

export async function getStaticProps() {
  const awtars = await fetch("")
  return {
    props: {

    }
  }
}