﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Player : MonoBehaviour

{
    public Image[] rakia;
    public Sprite fullRakia;
    public Sprite emptyRakia;

    public float speed;
    private Rigidbody2D rb;
    private Vector2 moveAmount;
    public int health;

    public GameObject deathEffect;
    public GameObject ouchSound;
    public GameObject dieSound;


    Animator cameraAnim;
    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
        cameraAnim = Camera.main.GetComponent<Animator>();
    }

    // Update is called once per frame
    void Update()
    {
        Vector2 moveInput = new Vector2(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical"));
        moveAmount = moveInput.normalized * speed;
    }

    private void FixedUpdate()
    {
        rb.MovePosition(rb.position + moveAmount * Time.fixedDeltaTime);  
    }

    public void TakeDamage(int damageAmount)
    {
        health -= damageAmount;
        cameraAnim.SetTrigger("Hit");
        UpdateRakiaUI(health);
        if (health <= 0)
        {
            Instantiate(dieSound, transform.position, Quaternion.identity);
            Destroy(gameObject);
            Instantiate(deathEffect, transform.position, transform.rotation);
        }
        else
        {
            Instantiate(ouchSound, transform.position, Quaternion.identity);
        }
    }

    void UpdateRakiaUI(int currentHealth)
    {
        for (int i = 0; i < rakia.Length; i++)
        {
            if (i < currentHealth)
            {
                rakia[i].sprite = fullRakia;
            }
            else
            {
                rakia[i].sprite = emptyRakia;
            }
        }
    }

    public void Heal(int healAmount)
    {
        if (health + healAmount > 5)
        {
            health = 5;
        }
        else
        {
            health += healAmount;
        }
        UpdateRakiaUI(health);
    }

}
