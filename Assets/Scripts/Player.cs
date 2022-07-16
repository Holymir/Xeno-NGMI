using System.Collections;
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
    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
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
        UpdateRakiaUI(health);
        if (health <= 0)
        {
            Destroy(gameObject);
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

}
