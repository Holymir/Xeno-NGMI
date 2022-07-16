using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainMenuManager : MonoBehaviour
{
   private void Start()
    {
        Debug.Log(gameObject.name);
    }
    public void ChangeLevel()
    {
        Application.LoadLevel("SampleScene");
    }
}
