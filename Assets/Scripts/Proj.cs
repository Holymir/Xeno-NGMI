using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Proj : MonoBehaviour
{
    public float speed;
    public float lifeTime;
    public int dmg;

    public GameObject explosion;
    public GameObject shotSound;
    // Start is called before the first frame update
    void Start()
    {
        Invoke("DestroyProj", lifeTime);
        Instantiate(shotSound, transform.position, transform.rotation);
    }

    // Update is called once per frame
    void Update()
    {
        transform.Translate(Vector2.up * speed * Time.deltaTime);
    }

    void DestroyProj()
    {
        Instantiate(explosion, transform.position, Quaternion.identity);
        Destroy(gameObject);
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.tag == "Enemy")
        {
            collision.GetComponent<Enemy>().TakeDamage(dmg);
            DestroyProj();
        }
    }
}
