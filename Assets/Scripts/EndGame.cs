using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EndGame : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(WaitForSceneLoad(3, "EndGame"));
    }

    private IEnumerator WaitForSceneLoad(float seconds, string level)
    {
        yield return new WaitForSeconds(seconds);
        LevelChanger.instance.ChangeLevel(level);
    }
}
