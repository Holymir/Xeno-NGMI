using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using UnityEngine.UI;

public class EndGameMenu : MonoBehaviour
{
   [DllImport("__Internal")] private static extern void EndGame(int score);
   [DllImport("__Internal")] private static extern int GetHighScore();
   [DllImport("__Internal")] private static extern void SetHighScore(int score);

   public Button button;
   public Button saveScoreButton;
   public Text finalScore;

   void Start() {
    Button playButton = button.GetComponent<Button>();
	playButton.onClick.AddListener(ButtonPressed);
    if(Score.instance.GetPoints() < GetHighScore()){
        finalScore.text = "Final score: "+Score.instance.GetPoints();
        saveScoreButton.gameObject.SetActive(false);
    }else{
        finalScore.text = "New high score: "+Score.instance.GetPoints();
        SetHighScore(Score.instance.GetPoints());
    }
   }

   static void ButtonPressed()
    {
        EndGame(Score.instance.GetPoints());
    }
}
