using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using UnityEngine.UI;

public class PlayButton : MonoBehaviour
{
   [DllImport("__Internal")] private static extern void CallContract();
   public Button button;

   void Start() {
    Button playButton = button.GetComponent<Button>();
	playButton.onClick.AddListener(ButtonPressed);
   }

   static void ButtonPressed()
    {
        CallContract();
    }
    static void ChangeLevel()
    {
        Application.LoadLevel("SampleScene");
        Debug.Log("asd");
    }
}
