
import Config

import psycopg2


from service import retrieveOdds


def migrate_data():
    conn = psycopg2.connect(**Config.DB_SETTINGS)
    cur = conn.cursor()

    cur.execute("""INSERT INTO tbMatches_h SELECT * FROM tbMatches WHERE DATE_TRUNC('day', starts) <= DATE_TRUNC('day', NOW() - INTERVAL '2 days') ON CONFLICT (id) DO NOTHING;""")

    cur.execute("""INSERT INTO tbOdds_h SELECT o.* FROM tbOdds o JOIN tbMatches m ON o.matchId = m.id WHERE DATE_TRUNC('day', m.starts) <= DATE_TRUNC('day', NOW() - INTERVAL '2 days')""")

    cur.execute("""DELETE FROM tbMatches WHERE DATE_TRUNC('day', starts) <= DATE_TRUNC('day', NOW() - INTERVAL '2 days')""")
    """
        DO $$ 
        DECLARE 
            batch_size INT := 100;  -- Defina um tamanho de lote adequado
        BEGIN
            LOOP
                DELETE FROM tbMatches 
                WHERE id IN (
                    SELECT id FROM tbMatches
                    WHERE DATE_TRUNC('day', starts) <= DATE_TRUNC('day', NOW() - INTERVAL '2 days')
                    LIMIT batch_size
                    FOR UPDATE SKIP LOCKED
                );
        
                EXIT WHEN NOT FOUND; -- Sai do loop quando não houver mais registros para deletar
            END LOOP;
        END $$;
    """

    conn.commit()
    cur.close()
    conn.close()


if __name__ == "__main__":
    retrieveOdds.retrieve_odds()


