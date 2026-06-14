
import { useState, useEffect } from "react"
import axios from "axios";
import { auth } from '../../firebase/firebase'

export default function Feedback() {
    const [emoji, setEmoji] = useState("");
    const [message, setMessage] = useState("");
    const [showFeedBack, setFeedBack] = useState(null);

    const handleEmoji = (emotion) => { setEmoji(emotion) }


    const handleSubmit = async () => {
        const user = auth.currentUser;
        const token = await user.getIdToken();
        const res = await axios.post(`${import.meta.env.VITE_API_SEND_FEEDBACK}`,
            { emoji: emoji, message: message },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (res.data.success) {
            alert("success")
        } else {
            alert("failed pare")
        }
    }

    useEffect(() => {
        const handleCheckFeedBack = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const token = await user.getIdToken();

                const res = await axios.get(
                    "http://localhost:5000/api/checkfeedback",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );



            } catch (err) {
                console.error("Check feedback error:", err);


                setFeedBack(false);
            }
        };

        handleCheckFeedBack();
    }, []);

    return (
        <>
            {showFeedBack ? (<div className="flex justify-center w-1/5  min-w-[250px]">
                <div className="w-full border-1  border-gray-200  shadow-md rounded-lg  bg-white p-3">
                    <div className="flex justify-between gap-2">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADEUlEQVR4nO1ZzU8TQRTfRC9aPHCsHuQgnelC8KpeimcrB8WT+h9Y+4Ggd/0vCJIoB0uiBz1gkeiFhM5QLErxoiFeSVsMEmmBwzNvtq24QLuzO7vbw77kJc3Ozu7v9772zaumBRJIIIGgQL7/MjCaAU5ngdMvwMkWMLIvFH9zuirWlmka79W6QWCRnANGxoDTb8ApyClZF4RLeo/3wD/FTgtLclKVB36ESAU4TeEzvQFfiFDgpOgcuEkZ+QycEHfBczICjOwoB89b+hs4uekS+Oh94OTARfDQCKkD4JF7isGTEW/A038kGI2rAb8U7Tdc6xV42syJHcw359XGjYS1TmLFUXUySqVP4HkrnJL2wK8OhYDRchcQqOAHU56A8YX1GTxthBLNyBOw1R645oV1+cbMd9DUrINKw2drQYep8avw6Naw0Mmxa7A5Nwhu7QOZZG60xG1BfHwzA3u1GuSyM5CIXxf6eHRYrKneByIPyCsJD9Cv7R6GFqzXdgGlvvunBQT1+cQV5fvA8EBRwgOixT3xYeh6tCCCyWVf/gdk/HZM+T4QHqBlCQ+QvU4EDr/8sE6MxpTvA4NAXRkBTLyTgLQLBbv7QJpAhxDCqoGJZwbx5E4Mfi0MKN8H8iHUPombFQWthrGLir87gnCwD+SSuH0Z9UWZXBnNdCGBh9YJLEWGuo9AdMAyAcMLZM130NxmM+c0jKpv+4A964X5VEgoe9oLm68v2iewTNOeHWh+TIXhfeIMzD04qt8nw3asX7E9vRMTM0nLI/hc8ixsTJ+H/cWI0J8vLohruFZ91ycZ+yRhC3zrUC8mZtZehqGClkbw5rWN6bBYw3skCBRgVjtlm4AgsaJfAk63rbxwPh0SINHq5jW8hmsfUiHvxipNwXGf54OtPL2hqRQc93k2WmTkrlLwLRKMxl2e0m0rt/wxJCJiYqYefAHHmK6CN40ck53abmvJSstYKh1XG1tESnqP8cUmJXngZE2MLv34i+k4wWbL8ArNGgNhUhUnO3G6Q0+RIrbE4p68rvuNN5BAAtG6Q/4CvAsbPliJ4lwAAAAASUVORK5CYII=" alt="sad--v2"
                            className={`cursor-pointer transition transform ${emoji === 'sad' ? 'scale-150 border-1 border-blue-500' : 'hover:scale-125'}`}
                            onClick={() => handleEmoji("sad")}
                        ></img>

                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADIElEQVR4nO1ZS09TQRS+QRMfJAorhIUkBpyDaNiokVV170JQ/oVGSaTgul3zcKEbH+hCk1pJ3IiiBI2bzogh4ELjwtfCFI2PTWnZ8JkzljalYGcu096S9CRfctPpmfudx8w9c8bzalKTmmxaAK8Or9uPQ9IQJMUhaQFK/IIUyxr6mRYg6YH+D/8XXl3wxGepGYqikOIrFMEKUnzRurPUXHnir440QtEYFKWtiRcjreea62qoDHlFvVC06ID4Gogkz10+4jFvW9brjonTmtSiUX6XW/IzrTuhxETZyatcNCb4ne48z7tHxcjTaiQeYSa0ffMGVCJt1EZGiBEXCzYY8kpHYQWSevyRnz2wF1J8C9QApddDkrdtP96/Gjx5WsWYHXl5aB8ULVUBcWSRxhvRYuP9aBWQxhpEzQuzf3UKqgpSfDYqAHWlGDRZtaERR03S54rJZL+fd+JmuBuXe09q3BjoxvcnnWXTAyPRES5tANfzBiSm43eRSS9h8v4dXDh9SmOwL4Q/053O9ZBHzMAA8bbUROzBzFIKLOlUKkeEcSt8wrkecilECwYpJH6WmohDzx5kMo/vjRcQCZ8LOddD3oAfJhFYLjXRwNlQwctNifjVQ96AjBMDeOFtRITTxLUerAwwSKHFycMY6iv2Ji/G/+0ofvVgmUIlFzGDdw1eeJwWDPagCQm/ejBexAbbaICIOfuQBYKEyYdsy5cS2OLFXBWX0xGv3Aeaqf56TJ7fhczL9qKxzIt2Pfasv778Bxq/3QgZadQkP423FI19vN2ix2S00Uf60KhnK0i07bE91Cfj+zXJpxd3ayM4Egx+5t94bDHeammASPrum+q2Crc2LF747lqTJroe3l9vsvX8ChIdZ3yRzxnBvUrLkHMkOFWmLtVr8LO954l3nuFNkQ+8tRhz1OTFh7YdFW3uSvGQ3+mEfGEkxIjtmrDOeSmGnbfXCwyR1JO9jHBsgEj67oNaGzHX1eD0iknSaMWumNa55Iv4qp24tlEUCeSSb90CUB08BkmD2R1rXp/s8tesfMqb12OJjjBXlVVxzVqTmnhbX/4CpMuSBAIdKH8AAAAASUVORK5CYII=" alt="happy--v1"
                            className={`cursor-pointer transition transform ${emoji === 'happy' ? 'scale-150 border-2 border-blue-500' : 'hover:scale-125'}`}
                            onClick={() => handleEmoji("happy")}></img>

                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUUlEQVR4nO2YS0/UUBTHr0qMG1+JCMO5ncrT4RVwmFuQRCfToiYu3BGjceMXMHHjFhd+AV0QEyRRF5IYEzbYO4gKogEfKBGDIkgUg0YUheGWhfFxzR0hEB7TzrQFjP0nZzOd0/5/PY+ZFiFPnjx58uQpgXRJOkgBLukYD+gYGzrAJMX4OQW40JKVVb5c3k1JClGAegrQJ3LiueIcAA3inMhtRX2+AMX4AcWYm8SVtpycrbN5LX7/dgrQZJoHcF9cwx3zAJGZO80txms9MzO9NSNjpw4wZDVPB5gU13LWvM8XSNL8bDzUAR4lnQcw4WglLLaN09HNEVrnzMCuvHkebycnBpsCNK4aAECD/QpgPOCkqY5smfeVBvgwKeHvSCkfDBbxx7vzeFSSFgNgPOAEAHPC+C2/xIdDJZyphBuasijGwxW8qyB3IQCzDSA2gl3zd2Q/H98XXNL4/GCqwnsK8+dyAb7ZrwBApx3zUQnzj9XlpuZnY0pVeGdudjy3qyCnl2nkoqGRfkMlMaYq75mm6EwNneC1tRusVuCUHYCnRfmWzc/G6N4yPlRRzJmm/E5QrWexmsp88wrk5W3RAb6mCjBaVZY0gGE1VDJmCYJifCZVgFgk5B6A9rcSpu3UjlAaxbg3FQDR024CGAJCCx01rUIUoIxiPJ0sgJXtYx+ANJsCxCEwPp4sgNj9rgOo5IMlgPg8iAeSJACeBPJWAEAxLANcLyraSAE6rAK0ShKfCLs8yBp5i5LRzGrtsQrxsqzQ5SqQa0kBxCEyM9N1jF9ZAbgt+3ksQtzq/5/TNSSEUhGV5V06xiNWIAaDxS61j3IO2VGbz+enAG+sVGHS8SqQJl6H1tsCiFfC7/dRgH4ziBelASc3z2UeDqfZNr8Aoi/xRsJ8fH/wu82N84NpymnkhppleRsFuJcAovtT9Z4jif5lGolCJWNMC9UgN9Uuy5t0jG8sNC8+E8fEdwxVqU9h27QYhyp8aCUkXodQgLPzzJ+vQ3PD9qW6ejNTlRFrd135zCLKMbQaimJ8UsRSx1gN0UweWH4xjVydClfsQGtVTCWNy6zHu8YBsuxL4jUj0UqGSgbnDWmfEak8jP4lGWpVkKlKr3goceRHyZMnT548/ff6AyWDtrMhmgWPAAAAAElFTkSuQmCC" alt="novel--v1"
                            className={`cursor-pointer transition transform ${emoji === 'heart' ? 'scale-150 border-2 border-blue-500' : 'hover:scale-125'}`}
                            onClick={() => handleEmoji("heart")}></img>

                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD2klEQVR4nO1ZS0xTQRR9tiJCRW0jCgoIUpjBSNgocaMuNEY3BkxMXBiNS38LjUFNjBsaPwuhsDAxMcYdoSpGJaII4t/OiD80Lgwm6kJrUBYafpp4zMwrLYW2vPf6aEvSSU7S9M3ce+7cOzN37ihKqqVaqsXcAMWC5yWVYPQoGL0CRnvAST8YGZGQv2kPGL0s+4i+UCyJJ95Nc8GpC4x8AafQBUY+y7HdNDf+xB+V28FpAzgd0k18IoakrFcV8+NDntOt4PS7CcTHgfiE7Kkj7lGs/lk3mTgdF1rULXSZS75r6Wxw0jLl5HnAGy1Cp3kzL3aPuJGno564jq51M2M3IB5hwyMZQerNWLCJIc+lF/6B0Wpj5LuXzQMjXxNqAJfrwSe2bSOz35h48nQUDfrIs+U54HQwCYjDjyG8IIv1zL4rCUhjHFzaEzM1T0FSgZFPmhJAmSkmmiyPaMRKLeFzLOzgZwRod049yXanqivcN29ZzeQGiHw+kvCqNGBvFnCtEHhSah7px6VA81JVdvWsaH09GgwgbyMKOO4A1igqNlrx/pADn64VGybe21KM1j0OKSsg94QjSgjRHg0hRH5GFHC1MKhojYK8dAUWi4INlTa0nlkiFGiIY4qX5/OxbX0WrBYFQuWXyqBMtBRGG9unxQMjUQnszgwxQAwRyE9XVPfXLQpviPjv3GLZZ3t2cNysGQp+rPaT35U5mfHDsRtwowhYqyq8tUIlLtC2Ysws7s+aOG5fVuC7mPHNdgXlNgVNdMy4m0UmGBAthEZRvygklEKwIwN4GGaBPygBdga9NwGns7WEX19si3gsmgrUXUl4Q2CTFTiZDXgjbIEC4ps7B9iSBqyboUKE3aU8bQtf0yKOto0mHh7jB1kywKvlIJv2qQSmeTJndjo9fL8E7xqz0XHIhtsHMsBq7fjdbuj0rlWm8kLzzVOAv09Dt0/f5QJJvG1/RgjEfzqNGNJ1odFbjei9kCOJMZcdg11ODHQU4617YYBw9ykHft0plt7gLjvaDmTg48VcHeFD3brISwO8zrlaL/WD95zoqpkzYabvHrTha3N+SN8/j0vRP9mJy8eC+AzXTWVZRZQ2NCgaeViCnno11jsP2/D67AIMdMZ4f2D0H7xlVYbIB4wQtUqTFrR+A0hdTOQTXlr0mFTkxQdnelyLu4xcFTpNIR/qCVKvdU0YjnlG6kwvr4cYwmi1/zHCZAOIz3AdVLcRryrmm/rExKg7bk9MYR75ag3lTiK34bQ2IY98YRNAXroKjB7x71hv5M0u+Mwqbnlv5DdvWY3IKpPimTXVUk2Z/u0/mi6DXgeCNvUAAAAASUVORK5CYII=" alt="angry--v1"
                            className={`cursor-pointer transition transform ${emoji === 'angry' ? 'scale-150 border-2 border-blue-500' : 'hover:scale-125'}`}
                            onClick={() => handleEmoji("angry")}></img>

                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none outline-none"
                            value={message} onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <div className="p-2 rounded-md bg-blue-500 text-white flex justify-center items-center cursor-pointer"
                        onClick={handleSubmit}>
                        <button>Send</button>
                    </div>
                </div>
            </div>) : (
                <div className="text-center p-4 text-gray-600 font-medium">
                    Already submitted
                </div>
            )}

        </>
    )
}