import { useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import SVG from '../assets/svg'
import * as util from '../components/utilStop'

interface InputInterface {
  vA: number,
  vE: number,
  tR: number,
  tS: number,
  am: number,
}

function Stop() {

  const data: InputInterface = {
    vA: 50,
    vE: 0,
    tR: 0.8,
    tS: 0.2,
    am: 7.5,
  }

  const [input, setInput] = useState<InputInterface>(data)

  const reaction: string = util.getReaction(input.vA, input.tR)
  const breakDelay: string = util.getBreakDelay(input.vA, input.tS, input.am)
  const fullSend: string = util.getFullSend(input.vA, input.am, input.tS)
  const breakDistance: string = util.getBreakDistance(input.vA, input.tS, input.vE, input.am)
  const breakDuration: string = util.getBreakDuration(input.vA, input.tS, input.am, input.vE)
  const fullDistance: string = util.getFullDistance(input.vA, input.vE, input.tR, input.tS, input.am)
  const fullTime: string = util.getFullTime(input.vA, input.vE, input.tR, input.tS, input.am)

  return (
    <div>

      <Head>
        <title>PPCAVS | Anhaltevorgang</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width" />
      </Head>

      <div className="grid 2xl:grid-cols-2 m-0 gap-5 p-4">

        <div className="flex bg-[#0059a9] border-[1.25rem] border-[#0059a9] rounded-xl">
          <h1 className="pr-6 text-center text-[#fff] self-center">Anhaltevorgang</h1>
          <table className="self-center">
            <tbody>
              <tr className="text-[#0059a9]">
                <th>Art</th>
                <th>Var</th>
                <th>Eingabe</th>
                <th>Einheit</th>
              </tr>
              <tr>
                <th>Anfangsgeschwindigkeit</th>
                {/* <th><img src="/vA.svg" alt="vA" className="m-auto"></img></th> */}
                <th><Image src={SVG.vA} alt="vA" className="absolute z-0"></Image></th>
                <th>
                  <div>
                    <input type="number" placeholder="v in km/h" defaultValue={input.vA || ''} onChange={(e) => setInput({ ...input, vA: e.target.valueAsNumber })} />
                  </div>
                </th>
                <th><Image src={SVG.kmh} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Endgeschwindigkeit</th>
                <th><Image src={SVG.vE} alt="vE" className="absolute z-0"></Image></th>
                <th>
                  <div>
                    <input type="number" placeholder="v in km/h" value={input.vE} onChange={(e) => setInput({ ...input, vE: e.target.valueAsNumber })} />
                  </div>
                </th>
                <th><Image src={SVG.kmh} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Reaktionsdauer</th>
                <th><Image src={SVG.tR} alt="tR" className="absolute z-0"></Image></th>
                <th>
                  <div>
                    <input type="number" placeholder="s in Sekunden" value={input.tR} onChange={(e) => setInput({ ...input, tR: e.target.valueAsNumber })} />
                  </div>
                </th>
                <th><Image src={SVG.s} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Bremsschwelldauer</th>
                <th><Image src={SVG.tS} alt="tS" className="absolute z-0"></Image></th>
                <th>
                  <div>
                    <input type="number" placeholder="s in Sekunden" value={input.tS} onChange={(e) => setInput({ ...input, tS: e.target.valueAsNumber })} />
                  </div>
                </th>
                <th><Image src={SVG.s} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Mittlere Verzögerung</th>
                <th><Image src={SVG.am} alt="am" className="absolute z-0"></Image></th>
                <th>
                  <div>
                    <input type="number" placeholder="a in m/s²" value={input.am} onChange={(e) => setInput({ ...input, am: e.target.valueAsNumber })} />
                  </div>
                </th>
                <th><Image src={SVG.ms2} alt="vA" className="absolute z-0"></Image></th>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#0059a9] border-[1.25rem] border-[#0059a9] rounded-xl">
          <table>
            <tbody>
              <tr className="text-[#0059a9]">
                <th>Art</th>
                <th>Var</th>
                <th>Eingabe</th>
                <th>Bemerkungen</th>
              </tr>
              <tr>
                <th>Anfangsgeschwindigkeit</th>
                <th><Image src={SVG.vA} alt="vA" className="absolute z-0"></Image></th>
                <th>{input.vA.toString().replace(".", ",")} km/h</th>
                <th><Image src={SVG.vAvE} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Endgeschwindigkeit</th>
                <th><Image src={SVG.vE} alt="vE" className="absolute z-0"></Image></th>
                <th>{input.vE.toString().replace(".", ",")} km/h</th>
                <td>0 für Bremsung bis zum Stillstand</td>
              </tr>
              <tr>
                <th>Reaktionsdauer</th>
                <th><Image src={SVG.tR} alt="tR" className="absolute z-0"></Image></th>
                <th>{input.tR.toString().replace(".", ",")} s</th>
                <td>Reaktionspunkt bis Bremspunkt</td>
              </tr>
              <tr>
                <th>Bremsschwelldauer</th>
                <th><Image src={SVG.tS} alt="tS" className="absolute z-0"></Image></th>
                <th>{input.tS.toString().replace(".", ",")} s</th>
                <td>Fahrzeugabhängig</td>
              </tr>
              <tr>
                <th>Mittlere Verzögerung</th>
                <th><Image src={SVG.am} alt="am" className="absolute z-0"></Image></th>
                <th>{input.am.toString().replace(".", ",")} m/s²</th>
                <td>Abhängig von der Reibpaarung</td>
              </tr>
              <tr className="text-[#0059a9]">
                <th>Art</th>
                <th>Var</th>
                <th>Ausgabe</th>
                <th>Formel</th>
              </tr>
              <tr>
                <th>Reaktionsstrecke</th>
                <th><Image src={SVG.sR} alt="vA" className="absolute z-0"></Image></th>
                <th>{reaction}</th>
                <th><Image src={SVG.sRF} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Schwellstrecke</th>
                <th><Image src={SVG.sS} alt="vA" className="absolute z-0"></Image></th>
                <th>{breakDelay}</th>
                <th><Image src={SVG.sSF} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Geschw. Vollverzögerung</th>
                <th><Image src={SVG.vV} alt="vA" className="absolute z-0"></Image></th>
                <th>{fullSend}</th>
                <th><Image src={SVG.vVF} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Bremsstrecke</th>
                <th><Image src={SVG.sB} alt="vA" className="absolute z-0"></Image></th>
                <th>{breakDistance}</th>
                <th><Image src={SVG.sBF} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Bremsdauer</th>
                <th><Image src={SVG.tB} alt="vA" className="absolute z-0"></Image></th>
                <th>{breakDuration}</th>
                <th><Image src={SVG.tBF} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Gesamtstrecke von <Image src={SVG.vA} alt="vA" className="absolute z-0"></Image> bis <Image src={SVG.vE} alt="vA" className="absolute z-0"></Image></th>
                <th><Image src={SVG.sges} alt="vA" className="absolute z-0"></Image></th>
                <th>{fullDistance}</th>
                <th><Image src={SVG.sgesF} alt="vA" className="absolute z-0"></Image></th>
              </tr>
              <tr>
                <th>Gesamtdauer von <Image src={SVG.vA} alt="vA" className="absolute z-0"></Image> bis <Image src={SVG.vE} alt="vA" className="absolute z-0"></Image></th>
                <th><Image src={SVG.tges} alt="vA" className="absolute z-0"></Image></th>
                <th>{fullTime}</th>
                <th><Image src={SVG.tgesF} alt="vA" className="absolute z-0"></Image></th>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default Stop;