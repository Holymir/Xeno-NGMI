using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using UnityEngine.UI;

public class EndGameMenu : MonoBehaviour
{
   [DllImport("__Internal")] private static extern void EndGame(int score);
   public Button button;
   public Text finalScore;

   void Start() {
    Button playButton = button.GetComponent<Button>();
	playButton.onClick.AddListener(ButtonPressed);
    Debug.Log(Score.instance.GetPoints());
    finalScore.text = "Final score: "+Score.instance.GetPoints();
   }

   static void ButtonPressed()
    {
        EndGame(Score.instance.GetPoints());
    }
}
