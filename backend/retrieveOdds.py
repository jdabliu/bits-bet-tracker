import asyncio
import json
import math
from datetime import datetime, timedelta, timezone
import time
import re

from dateutil import parser

import Config
import Queries
import requests
import psycopg2



def insert_data(data, sport, timestamp):
    conn = psycopg2.connect(**Config.DB_SETTINGS)
    cur = conn.cursor()

    for match in data:
        try:
            league_name = match["league"]["name"]
            event_id = match["id"]
            starts = match["date"]
            home = match["home"]
            away = match["away"]
            status = match["status"]
            urls = match["urls"]

            dt = datetime.now(timezone.utc)
            starts2 = parser.isoparse(match["date"])

            if status != "pending":
                continue
            #if starts2 < dt:
            #    return

            print(f"Liga: {league_name} | {event_id} Jogo: {home} vs {away}")

            cur.execute("SELECT totalUpdatedAt, spreadUpdatedAt, moneylineUpdatedAt FROM tbMatches WHERE id = %s", (event_id,))
            match_row = cur.fetchone()

            is_new_match = match_row is None
            hdp = None
            points = None

            if is_new_match:
                match_values = (event_id, starts, league_name, sport, home, away)
                cur.execute("""INSERT INTO tbMatches (id, starts, league, sport, home, away) VALUES (%s, %s, %s, %s, %s, %s);""", match_values)

            insert_values = []
            max_ml = None
            max_spread = None
            max_points = None

            for odds in match["bookmakers"]["Pinnacle"]:
                if odds["name"] == "ML":
                    draw_value = odds["odds"][0]["draw"] if sport.lower() == "futebol" else None
                    max_ml = odds["odds"][0]["max"]

                    insert_values.append((event_id, "moneyline", None, odds["odds"][0]["home"], odds["odds"][0]["away"], draw_value, timestamp, max_ml))
                    continue

                if odds["name"] == "Spread":
                    for option in odds["odds"]:
                        hdp = option["hdp"] if hdp is None else hdp
                        max_spread = option["max"]

                        insert_values.append((event_id, "spread", option["hdp"], option["home"], option["away"], None, timestamp, max_spread))
                    continue

                if odds["name"] == "Totals":
                    for option in odds["odds"]:
                        points = option["hdp"] if points is None else points
                        max_points = option["max"]

                        insert_values.append((event_id, "totals", option["hdp"], option["over"], option["under"], None, timestamp, max_points))
                    continue

            if insert_values:
                if is_new_match:
                    cur.execute("UPDATE tbmatches SET hdp = %s, points = %s, totalUpdatedAt = %s, spreadUpdatedAt = %s, moneylineUpdatedAt = %s WHERE id = %s ",
                                (hdp, points, timestamp, timestamp, timestamp, event_id))

                match_values = (timestamp, timestamp, timestamp, max_spread, max_ml, max_points, event_id)

                cur.execute("UPDATE tbMatches SET spreadUpdatedAt = %s, moneylineUpdatedAt = %s, totalUpdatedAt = %s, maxSpread = %s, maxMoneyline = %s, maxTotal = %s WHERE id = %s;", match_values)

                cur.executemany("""INSERT INTO tbOdds (matchId, market, hdp_points, home_over, away_under, draw, updated_at, max_bet) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""", insert_values)

        except Exception as e:
            print(f"Erro: {str(e)}")


    conn.commit()
    cur.close()
    conn.close()



def processar_raw_text(raw_text):
    raw_text = raw_text.strip()

    # Quando tem '][' no meio, precisamos corrigir
    if '][' in raw_text:
        # Separa os arrays
        partes = raw_text.split('][')
        blocos = []

        for i, parte in enumerate(partes):
            if not parte.startswith('['):
                parte = '[' + parte
            if not parte.endswith(']'):
                parte = parte + ']'

            try:
                bloco = json.loads(parte)
                blocos.extend(bloco)
            except json.JSONDecodeError as e:
                print(f"Erro ao decodificar um bloco: {e}")

        return blocos
    else:
        # Se for só um array normal
        return json.loads(raw_text)


def retrieve_odds():
    last_fetch_times = {}
    SAFETY_BUFFER_SECONDS = 12
    POLL_INTERVAL = 1

    while True:
        dt = datetime.now(timezone.utc)

        print(f"Iniciando Processamento... {dt.isoformat()}")

        try:
            for sport_name, sport in [("Football", "Futebol"), ("Basketball", "Basquete"), ("Tennis", "Tennis"), ("American Football", "American Football")]:
                since_time = int((dt - timedelta(seconds=SAFETY_BUFFER_SECONDS)).timestamp())

                print(f"Checking {sport} since {since_time}")

                url = (
                    f"https://api.odds-api.io/v2/odds/updated"
                    f"?sport={sport_name}"
                    f"&since={since_time}"
                    f"&apiKey={Config.TOKEN_ODDSAPI}"
                    f"&bookmaker=Pinnacle"
                    f"&status=pending"
                )

                response = requests.get(url, timeout=15)

                if response.status_code == 200:
                    matches = response.json()
                    if matches:
                        print(f'{len(matches)} jogos encontrados para {sport}...')
                        insert_data(matches, sport, datetime.utcnow())
                    else:
                        print(f'Nenhum jogo encontrado para {sport}.')

                else:
                    print(f"Erro HTTP {response.status_code}: {response.text}")

        except Exception as e:
            print(f"Erro na execução principal: {str(e)}")

        time.sleep(POLL_INTERVAL)



















