import {useState} from 'react'
import { Chart } from "react-google-charts";
import {AiFillLike,AiFillDislike} from "react-icons/ai";
import {BsFillEmojiNeutralFill} from "react-icons/bs";

const styles = {
  backgroundImage:"url('bg.jpg')", 
  backgroundRepeat:"no-repeat",
  backgroundSize:"cover",
  height:"80vh"
};

const BaseURI = "http://127.0.0.1:5000/api/video";

const App = () => {
  const [videoID,setVideoID] = useState();
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState(null);

  const processVideo = e =>{
    e.preventDefault();

    if(!videoID || !videoID.trim().length)
      return;

    setLoading(true);
    setData(null);

    fetch(BaseURI,{
      method : "POST",
      headers : {
        'Content-Type' : "application/json"
      },
      body : JSON.stringify({videoID})
    }).then(res => res.json())
      .then(dt => {
        setLoading(false);

        console.log(dt);
        if(dt.error){
          setError(dt.error)
        }else{
        
          setData(dt)
        }
      }).catch(err => {
        setLoading(false);
        setData(null);
        setError("sorry, oups something went wrong. Please verify your Video ID and Try Again");
        console.error(err);
      })
    
  };
  //366gtuFa9V4
  const options = {
    pieHole: 0.4,
    is3D: false,
  };

  return (
    <div>
      <div className='relative' style={styles}>
        <div className='absolute top-0 left-0 h-full w-full bg-gray-900 bg-opacity-70'></div>
          <header className='z-10 text-white relative h-full'>
            <div className='shadow-xl'>
              <nav className='flex p-4 max-w-6xl m-auto'>
                <h2 className='text-3xl italic font-bold text-red-600'>YT<sub>analyzer</sub></h2>
              </nav>
            </div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2'>
              <form onSubmit={processVideo} className='max-w-lg m-auto shadow-2xl'>
                  <input style={{width:'400px'}} onChange={e => setVideoID(e.target.value)} className='text-gray-700 py-4 px-4 rounded-l-md' placeholder='Enter youtube video ID here: e.g : 366gtuFa9V4' type="text" required/>
                  <input className='cursor-pointer rounded-r-md py-4 px-4 bg-red-600' type="submit" value="ok"/>
              </form>
            </div>
          </header>
      </div>
      {data != null && <main className='max-w-4xl m-auto my-20'>
        <div>
          <h2 className='text-center text-xl font-bold text-gray-700'>Donut Chart showing the polarity labels of comments</h2>
            <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data.bar_chart_data}
            options={options}
          />
        </div>
        <div>
            <h2 className='text-center text-xl font-bold text-gray-700'>Distibution of polarity score accross the comments of your video</h2>
            <Chart
              chartType="Histogram"
              width="100%"
              height="400px"
              data={[["Label","score"],...data.histogramm_data]}
              options={{
                legend: { position: "none" },
              }}
        />
        </div>
        <div className='space-y-4'>
          <details className='p-4 bg-gray-50 rounded text-gray-700'>
            <summary className='cursor-pointer'>Top 5 best comments based on polarity score</summary>
            <ul className='p-4 space-y-2'>
              {data.top_comments.map((c,i)=>{
                return <li key={i} className="bg-white p-2 rounded">
                  <p>
                  {c["comment"].length < 100 ? c["comment"]:c["comment"].substring(0,100) + " ..."}
                  </p>
                  <div className='flex items-center justify-end space-x-4 mt-4'>
                    <div className='flex items-center space-x-2'>
                      <span>{c["Positive"]}%</span>
                      <AiFillLike color='#1ba39c'/>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span>{c["Negative"]}%</span>
                      <AiFillDislike color='#96281b'/>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span>{c["Neutral"]}%</span>
                      <BsFillEmojiNeutralFill color='#bd9b19'/>
                    </div>
                  </div>
                </li>
              })}
            </ul>
          </details>
          <details className='p-4 bg-gray-50 rounded text-gray-700'>
            <summary className='cursor-pointer'>Top 5 worse comments based on polarity score</summary>
            <ul className='p-4 space-y-2'>
              {data.worse_comments.map((c,i)=>{
                return <li key={i} className="bg-white p-2 rounded">
                  <p>
                  {c["comment"].length < 100 ? c["comment"]:c["comment"].substring(0,100) + " ..."}
                  </p>
                  <div className='flex items-center justify-end space-x-4 mt-4'>
                    <div className='flex items-center space-x-2'>
                      <span>{c["Positive"]}%</span>
                      <AiFillLike color='#1ba39c'/>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span>{c["Negative"]}%</span>
                      <AiFillDislike color='#96281b'/>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <span>{c["Neutral"]}%</span>
                      <BsFillEmojiNeutralFill color='#bd9b19'/>
                    </div>
                  </div>
                </li>
              })}
            </ul>
          </details>
        </div>
      </main>}
    </div>
  )
}

export default App