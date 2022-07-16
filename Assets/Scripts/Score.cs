using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Score : MonoBehaviour
{
    public static Score instance;
    public Text scoreText;
    private int points;

    private void Awake()
    {
        instance = this;
    }
    // Start is called before the first frame update
    void Start()
    {
        scoreText.text = "Score: " + points.ToString();
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
