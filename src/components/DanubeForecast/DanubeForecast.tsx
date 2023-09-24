import { useContext, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import React from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import moment from "moment";

import './DanubeForecast.scss';
import InfoTile from "../general/InfoTile";
import { SettingsContext } from "../../Settings";

interface Params {
}

interface WaterInfoForecast {
  date?: string;
  stage?: number;
}

interface WaterInfo {
  stage?: number; // Current stage in cm
  stage_change?: number; // Change of water stage in cm
  tendency?: 'stagnation' | 'rising'; // TODO: list all values
  flow_rate?: number; // Current flow rate in m3/s
  temperature?: number; // Water Temperature in C
  forecast?: WaterInfoForecast[]; // forecast info
  warning_level?: number; // First flood alert level in mm
  critical_level?: number; // Second flood alert level in mm
}

interface FeedObject {
  title?: string;
  link?: string;
  id?: string;
  summary?: string;
  updated?: string,
}
const levelSourceURL = "https://www.hidmet.gov.rs/eng/osmotreni/stanje_voda.xml"
const forecastSourceURL = "https://www.hidmet.gov.rs/eng/prognoza/prognoza_voda.xml"

function strToDate(str: string): string {
  let c = moment(str, "DD.MM.");
  if (c.isBefore(moment().subtract(10, 'days'))) {
    c = c.add(1, 'year')
  }
  return c.format('dddd');
}

function toLevel(value?: number, relative?: boolean): string {
  if (value === undefined || isNaN(value)) {
    return "-"
  }

  const prefix = (relative && value > 0) ? "+" : "";
  return prefix + value.toString() + "cm"
}

function toTemperature(value?: number): string {
  if (value === undefined || isNaN(value)) {
    return "-"
  }

  return value.toString() + "°C"
}

function toFlowRate(value?: number) {
  if (value === undefined || isNaN(value)) {
    return "-"
  }

  return value.toString() + "m³/h"
}

export default function DanubeForecast(params: Params) {

  const settings = useContext(SettingsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>();
  const [info, setInfo] = useState<WaterInfo | null>();

  React.useEffect(() => {

    if (!settings) return; // wait to load settings.json

    const proxyUrl = settings.proxy_server ?? "";

    const requests = [proxyUrl+levelSourceURL, proxyUrl+forecastSourceURL].map((url) => axios.get(url));

    axios.all(requests)
      .then((response) => {
        const regex = /\s*([\w\s]*)\s*:\s*([^:]*)\s*;/msg;
        const parser = new XMLParser();

        // Example: Water stage: 13 cm; Change of water stage: 5 cm; Flow rate: 1400 m3/s; Water temperature: 21.4 (°C); Tendency of water stage: stagnation; 
        const levelDataList: FeedObject[] = parser.parse(response[0].data)?.feed?.entry ?? [];
        let levelData = levelDataList.find((e) => e.id?.startsWith("urn:uuid:hidmet-stanje-voda-42010-"))?.summary ?? "";
        levelData = levelData.replace(/\s*[\n\r]+\s*/, " ");
        const ldRes = Array.from(levelData.matchAll(regex));

        // Example: Water stage on today: 24.09. SUNDAY 13 cm; Water stage forecast: 25.09. MONDAY 10 cm; 26.09. TUESDAY 8 cm; 27.09. WEDNESDAY 20 cm; 28.09. THURSDAY 30 cm; First flood alert: 500 cm; Second flood alert: 700 cm;
        const forecastDataList: FeedObject[] = parser.parse(response[1].data)?.feed?.entry ?? [];
        let forecastData = forecastDataList.find((e) => e.id?.startsWith("urn:uuid:hidmet-prognoza-voda-42010-"))?.summary ?? "";
        forecastData = forecastData.replace(/\s*[\n\r]+\s*/, " ");
        const fdRes = Array.from(forecastData.matchAll(regex));

        const waterInfo: WaterInfo = {
        }

        let infos: { [key: string]: string } = {};
        [...ldRes, ...fdRes].forEach((v) => {
          infos[v[1]] = v[2]
        })

        waterInfo.stage = parseFloat(infos["Water stage"]);
        waterInfo.stage_change = parseFloat(infos["Change of water stage"]);
        waterInfo.flow_rate = parseFloat(infos["Flow rate"]);
        waterInfo.temperature = parseFloat(infos["Water temperature"]);
        waterInfo.tendency = infos["Tendency of water stage"] as any;
        waterInfo.warning_level = parseFloat(infos["First flood alert"]);
        waterInfo.critical_level = parseFloat(infos["Second flood alert"]);
        waterInfo.forecast = [];

        let forecastArray = infos["Water stage forecast"].split(";");

        forecastArray.forEach((v, idx) => {
          v = v.trim();
          const data = v.trim().split(" ")

          v = {
            date: strToDate(data[0]),
            stage: data[2]
          } as any;
          forecastArray[idx] = v;
        })

        waterInfo.forecast = forecastArray as any;
        setInfo(waterInfo);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError("unable to fetch Danube water data");
        setIsLoading(false);
      });
  }, [settings]);

  let forecasts = [];


  for (let i = 0; i < (info?.forecast?.length ?? 0); i++) {
    const f = info!.forecast![i];

    if (f.date) {
      forecasts.push(
      <div key={f.date} className="danube-forecast-item">
        <div className="danube-forecast-day">{f.date}</div>
        <div className="danube-forecast-value">{toLevel(f.stage)}</div>
      </div>)
    }
  }

  return (
    <div id="danube-forecast">
      <div className="main-area-title">
        <span>Danube Water Info</span>
      </div>

      {isLoading ?
        <LoadingSpinner small={false} /> : error ? <div className="error">{error}</div> :
          <div>
            {info && <div className="info-tiles">

              <InfoTile title="Water Level" icon="house-flood-water">
                <div className="info-tile-col">
                  <div className="info-tile-row danube-forecast-stage">
                    <div className="danube-forecast-value">{toLevel(info.stage)}</div>
                    <div className="danube-forecast-value2">{toLevel(info.stage_change, true)}</div>
                  </div>
                  <div className="danube-forecast-tendency">{info.tendency}</div>
                </div>
              </InfoTile>

              <InfoTile title="Water Temperature" icon="temperature-half">
                <div className="danube-forecast-value">{toTemperature(info.temperature)}</div>
              </InfoTile>

              <InfoTile title="Flow Rate" icon="water">
                <div className="danube-forecast-value">{toFlowRate(info.flow_rate)}</div>
              </InfoTile>

              <InfoTile title="Water Forecast" size="3x">
                <div className="danube-forecast-list">{forecasts}</div>
              </InfoTile>

            </div>}
          </div>
      }
    </div>
  );
}
