using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LevelChanger : MonoBehaviour
{
    public static LevelChanger instance;

    private void Awake()
    {
        instance = this;
        DontDestroyOnLoad(this.gameObject);
    }

    public void ChangeLevel(string level)
    {
        StartCoroutine(WaitForSceneLoad(2, level));
    }

    private IEnumerator WaitForSceneLoad(float seconds, string level)
    {
        yield return new WaitForSeconds(seconds);
        SceneManager.LoadScene(level);
    }

}
