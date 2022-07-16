using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AmbientSound : MonoBehaviour
{
    public GameObject ambientSound;

    // Start is called before the first frame update
    void Start()
    {
        Instantiate(ambientSound, transform.position, Quaternion.identity);
    }

}
