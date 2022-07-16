using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public void ChangeLevel()
    {
        Application.LoadLevel("EndGame");
    }
}
