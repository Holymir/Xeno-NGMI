using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaveSpawner : MonoBehaviour
{
    [System.Serializable]
    public class Wave
    {
        public Enemy enemy;
        public int count;
        public float timeBetweenSpawns;
    }

    public Wave wave;
    public Transform[] spawnPoints;
    public float timeBetweenWaves;

    private Wave currentWave;
    private int currentWaveIndex;
    private Transform player;

    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player").transform;
        StartCoroutine(StartNextWave(currentWaveIndex));

    }

    IEnumerator StartNextWave(int index)
    {
        yield return new WaitForSeconds(timeBetweenWaves);
        StartCoroutine(SpawnWave(index));
    }
    
    IEnumerator SpawnWave(int index)
    {
        //currentWave = waves[index];
        for (int i = 0; i < wave.count; i++)
        {
            if (player == null)
            {
                yield break;
            }
            Enemy randomEnemy = wave.enemy;
            Transform randomSpot = spawnPoints[Random.Range(0, spawnPoints.Length)];
            Instantiate(randomEnemy, randomSpot.position, randomSpot.rotation);
            wave.count++;
            yield return new WaitForSeconds(wave.timeBetweenSpawns);
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
