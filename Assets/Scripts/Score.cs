using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.Runtime.InteropServices;

public class Score : MonoBehaviour
{
    public static Score instance;
    public Text scoreText;
    public Text highScore;
    private int points;
   [DllImport("__Internal")] private static extern int GetHighScore();

    private void Awake()
    {
        instance = this;
    }
    // Start is called before the first frame update
    void Start()
    {
        scoreText.text = "Score: " + points.ToString();
        highScore.text = "High Score: "+ GetHighScore();
    }

    // Update is called once per frame
    void Update()
    {

    }
    public int GetPoints(){
        return points;
    }

    public void AddPoint()
    {
        points++;
        scoreText.text = "Score: " + points.ToString();
    }
}
