import { useState } from "react";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
import Alert from "./components/Alert";
import Comments from "./components/Comments";
import Histogram from "./components/Histogram";
import DonutChart from "./components/DonutChart";

const styles = {
  backgroundImage: "url('bg.jpg')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "80vh",
};

const BaseURI = "https://chupacabra-api.herokuapp.com/api/video";

const App = () => {
  const [url, setUrl] = useState(
    "https://www.youtube.com/watch?v=-nS9n7_OVWo&ab_channel=FootballskillzUnleashed"
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const processVideo = (e) => {
    e.preventDefault();

    if (!url || !url.trim().length) return;

    setLoading(true);
    setData(null);

    let params = {};
    try{
      const u = new URL(url);
      params = new URLSearchParams(u.search);
    }catch(err){
      console.error(err);
      setLoading(false);
      alert("Please provide a valid youtube video url");
      return;
    }

    if (!params.has("v")) {
      setError("Bad Url, please try a valid youtube video url");
      return;
    }

    const videoID = params.get("v");

    fetch(BaseURI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoID }),
    })
      .then((res) => res.json())
      .then((dt) => {
        setLoading(false);
        console.log(dt);
        if (dt.error) {
          setError(dt.error);
          alert(dt.error);
        } else {
          setData(dt);
        }
      })
      .catch((err) => {
        setLoading(false);
        setData(null);
        setError(
          "sorry, oups something went wrong. Please verify your Video ID and Try Again"
        );
        console.error(err);
        alert("sorry, oups something went wrong. Please verify your Video ID and Try Again");
      });
  };

  return (
    <div>
      <div className="relative" style={styles}>
        <div className="absolute top-0 left-0 h-full w-full bg-gray-900 bg-opacity-80"></div>
        <header className="z-10 text-white relative h-full">
          <div className="shadow-xl">
            <NavBar/>
          </div>
          <div className=" mt-20">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-5xl font-semibold">How Useful Is Your Video To The Audience ?</h1>
              <p className="text-lg">discover it right now</p>
            </div>
            <form
              onSubmit={processVideo}
              className="flex justify-center items-center shadow-2xl"
            >
              <div>
                <input
                  style={{ width: "610px" }}
                  onChange={(e) => setUrl(e.target.value)}
                  className="text-gray-700 py-4 px-4 rounded-l-md"
                  placeholder="Enter youtube video url here."
                  type="text"
                  required
                />
                <input
                  className="cursor-pointer rounded-r-md py-4 px-4 bg-blue-600"
                  type="submit"
                  value="ok"
                />
              </div>
            </form>
              <p className="text-center my-2 opacity-50">e.g : https://www.youtube.com/watch?v=-nS9n7_OVWo&ab_channel=FootballskillzUnleashed</p>
          </div>
        </header>
      </div>
      {loading && <div className="flex justify-center items-center mt-12">
        <Loading/>
        </div>}
      {data != null && (
        <main className="max-w-4xl m-auto my-20">
          {data.class == "Positive" && (
            <Alert color="bg-green-400" msg="Your video was classified as positive"/>
          )}
          {data.class == "Negative" && (
            <Alert color="bg-red-400" msg="Your video was classified as negative"/>
          )}
          {data.class == "Neutral" && (
             <Alert color="bg-blue-400" msg="Your video was classified as neutral"/>
          )}

          {data.bar_chart_data.length > 0 && (
            <DonutChart heading="Donut Chart showing the polarity labels of comments" data={data.bar_chart_data}/>
          )}
          {data.histogramm_data.length > 0 && (
            <Histogram heading="Distibution of polarity score accross the comments of your video" data={[["Label", "score"], ...data.histogramm_data]}/>
          )}
          <div className="space-y-4">
            {data.top_comments.length > 0 && (
              <Comments heading="Top 5 best comments based on polarity score" comments={data.top_comments}/>
            )}
            {data.worse_comments.length > 0 && (
              <Comments heading="Top 5 worse comments based on polarity score" comments={data.worse_comments}/>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
