using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    public int health;
    public float speed;
    public int dmg;
    [HideInInspector]
    public GameObject player;

    public GameObject[] pickups;
    public GameObject deathEffect;
    public GameObject explosionSound;
    public int pickupChance;

    public float stopDistance;
    public void TakeDamage(int damageAmount)
    {
        health -= damageAmount;
        Instantiate(explosionSound, transform.position, transform.rotation);

        if (health <= 0)
        {
            int randomNumber = Random.Range(0, 101);
            if (randomNumber < pickupChance)
            {
                GameObject randomPickup = pickups[Random.Range(0, pickups.Length)];
                Instantiate(randomPickup, transform.position, transform.rotation);
            }
            Destroy(gameObject);
            Instantiate(deathEffect, transform.position, transform.rotation);
            Score.instance.AddPoint();
        }
    }
    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void Update()
    {
        if (player.transform != null)
        {
            if (Vector2.Distance(transform.position, player.transform.position) > stopDistance)
            {
                transform.position = Vector2.MoveTowards(transform.position, player.transform.position, speed * Time.deltaTime);
            }
        }
        else
        {
            // go to end scene
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.tag == "Player")
        {
            collision.GetComponent<Player>().TakeDamage(dmg);
            Destroy(gameObject);
        }
    }
}
